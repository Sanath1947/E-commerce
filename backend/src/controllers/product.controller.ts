import { Request, Response } from 'express';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Product from '../models/product.model';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
});

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, search, sort, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query: any = {};
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort options
    let sortOptions = {};
    if (sort === 'price_asc') sortOptions = { price: 1 };
    else if (sort === 'price_desc') sortOptions = { price: -1 };
    else if (sort === 'newest') sortOptions = { createdAt: -1 };

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    // Generate signed URLs for 3D models
    const productsWithUrls = await Promise.all(
      products.map(async (product) => {
        let modelUrl = null;
        if (product.modelKey) {
          const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: product.modelKey,
          });
          modelUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        }
        return {
          ...product.toJSON(),
          modelUrl,
        };
      })
    );

    res.json({
      products: productsWithUrls,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let modelUrl = null;
    if (product.modelKey) {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: product.modelKey,
      });
      modelUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    }

    res.json({
      ...product.toJSON(),
      modelUrl,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product({
      ...req.body,
      createdBy: req.user.id,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    // Delete 3D model from S3 if exists
    if (product.modelKey) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: product.modelKey,
        })
      );
    }

    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

export const uploadProductModel = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const modelKey = `models/${product._id}/${Date.now()}-${req.file.originalname}`;

    // Delete old model if exists
    if (product.modelKey) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: product.modelKey,
        })
      );
    }

    // Upload new model
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: modelKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    product.modelKey = modelKey;
    await product.save();

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: modelKey,
    });
    const modelUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    res.json({
      message: 'Model uploaded successfully',
      modelUrl,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading model', error });
  }
}; 