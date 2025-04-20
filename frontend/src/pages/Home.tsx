import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import ProductViewer3D from '../components/ProductViewer3D';
import { addItem } from '../store/slices/cartSlice';

// Mock featured products (in a real app, this would come from an API)
const featuredProducts = [
  {
    id: '1',
    name: 'Modern Chair',
    price: 299.99,
    image: '/images/chair.jpg',
    modelUrl: '/models/chair.glb',
    description: 'Ergonomic design with premium materials',
  },
  {
    id: '2',
    name: 'Designer Lamp',
    price: 149.99,
    image: '/images/lamp.jpg',
    modelUrl: '/models/lamp.glb',
    description: 'Contemporary lighting solution',
  },
  {
    id: '3',
    name: 'Coffee Table',
    price: 399.99,
    image: '/images/table.jpg',
    modelUrl: '/models/table.glb',
    description: 'Minimalist design with storage',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(featuredProducts[0]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Welcome to 3D E-Commerce
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Experience products in immersive 3D before you buy
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box sx={{ height: 500, bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
            <ProductViewer3D modelUrl={selectedProduct.modelUrl} />
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography variant="h4" gutterBottom>
            Featured Products
          </Typography>
          <Grid container spacing={2}>
            {featuredProducts.map((product) => (
              <Grid item xs={12} key={product.id}>
                <Card
                  sx={{
                    display: 'flex',
                    cursor: 'pointer',
                    bgcolor: selectedProduct.id === product.id ? 'action.selected' : 'background.paper',
                  }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 120, height: 120, objectFit: 'cover' }}
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary">
                        ${product.price}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(addItem(product));
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Why Shop with Us?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Immersive 3D Preview
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View products from every angle before purchasing
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quality Guaranteed
            </Typography>
            <Typography variant="body1" color="text.secondary">
              All products are carefully curated and quality checked
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Fast Shipping
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Free delivery on orders over $500
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 