output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = aws_subnet.private[*].id
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket for assets"
  value       = aws_s3_bucket.assets.id
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.assets.id
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.assets.domain_name
}

output "elastic_beanstalk_application_name" {
  description = "Name of the Elastic Beanstalk application"
  value       = aws_elastic_beanstalk_application.app.name
}

output "elastic_beanstalk_environment_name" {
  description = "Name of the Elastic Beanstalk environment"
  value       = aws_elastic_beanstalk_environment.app_env.name
}

output "elastic_beanstalk_endpoint" {
  description = "Endpoint URL of the Elastic Beanstalk environment"
  value       = aws_elastic_beanstalk_environment.app_env.endpoint_url
}

output "route53_nameservers" {
  description = "Nameservers of the Route53 zone"
  value       = aws_route53_zone.main.name_servers
}

output "cloudwatch_log_group" {
  description = "Name of the CloudWatch log group"
  value       = aws_cloudwatch_log_group.app.name
}

output "iam_instance_profile" {
  description = "Name of the IAM instance profile"
  value       = aws_iam_instance_profile.eb_instance_profile.name
}

output "nat_gateway_ips" {
  description = "Elastic IPs of the NAT Gateways"
  value       = aws_eip.nat[*].public_ip
} 