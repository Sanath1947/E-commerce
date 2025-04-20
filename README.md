# 3D E-commerce Platform

A modern, immersive 3D e-commerce platform built with React, Three.js, and AWS services.

## Architecture Overview

This application implements a scalable, secure, and high-performance e-commerce platform with the following components:

### Frontend
- React.js for UI components
- Three.js for 3D product visualization
- AWS S3 for static asset hosting
- CloudFront for global content delivery
- Route53 for DNS management

### Backend
- Node.js backend deployed on ElasticBeanstalk
- Auto Scaling Groups for handling variable load
- Elastic Load Balancer for traffic distribution
- Lambda functions for serverless operations

### Infrastructure
- VPC with public and private subnets
- IAM roles and policies for security
- CloudWatch for monitoring and logging
- CloudTrail for API activity tracking
- CI/CD pipeline using AWS CodeCommit, CodeBuild, and CodeDeploy

## Project Structure

```
.
├── frontend/                 # React + Three.js frontend application
├── backend/                  # Node.js backend application
├── infrastructure/          # Terraform IaC configurations
├── lambda/                  # Lambda function implementations
└── scripts/                 # Deployment and utility scripts
```

## Prerequisites

- Node.js >= 18.x
- AWS CLI configured with appropriate credentials
- Terraform >= 1.0
- Docker (for local development)

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Set up infrastructure:
```bash
cd ../infrastructure
terraform init
terraform plan -var="domain_name=your-domain.com" -var="db_username=admin" -var="db_password=your-password"
terraform apply -var="domain_name=your-domain.com" -var="db_username=admin" -var="db_password=your-password"
```

4. Start development servers:
```bash
# Frontend
cd ../frontend
npm run dev

# Backend
cd ../backend
npm run dev
```

## Development

### Frontend Development
The frontend is built with React and Three.js. To add new 3D models:
1. Place model files in `frontend/public/models/`
2. Use the `useLoader` hook from `@react-three/fiber`

### Backend Development
The backend uses Express.js with TypeScript. To add new API endpoints:
1. Create a new route file in `backend/src/routes/`
2. Register the route in `backend/src/app.ts`

## Deployment

The application uses AWS CodePipeline for continuous deployment:

1. Push changes to CodeCommit repository
2. CodeBuild will automatically build and test the application
3. CodeDeploy will deploy to staging/production environments

## Monitoring

- CloudWatch dashboards are available at [dashboard-url]
- Logs are centralized in CloudWatch Logs
- Performance metrics are tracked via CloudWatch Metrics

## Security

- All secrets are managed through AWS Secrets Manager
- IAM roles follow least-privilege principle
- VPC security groups restrict access to resources
- CloudTrail tracks all API activities

## License

MIT License - See LICENSE file for details 