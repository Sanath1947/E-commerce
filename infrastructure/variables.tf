variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "3d-ecommerce"
}

variable "environment" {
  description = "Environment (e.g., dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
}

variable "ssl_certificate_arn" {
  description = "ARN of SSL certificate in ACM"
  type        = string
  default     = ""
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "Name of the database"
  type        = string
  default     = "3d_ecommerce"
}

variable "db_username" {
  description = "Database master username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
}

variable "min_capacity" {
  description = "Minimum number of EC2 instances"
  type        = number
  default     = 2
}

variable "max_capacity" {
  description = "Maximum number of EC2 instances"
  type        = number
  default     = 4
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "health_check_path" {
  description = "Path for health check"
  type        = string
  default     = "/health"
}

variable "enable_deletion_protection" {
  description = "Enable deletion protection for RDS"
  type        = bool
  default     = true
}

variable "backup_retention_period" {
  description = "Number of days to retain backups"
  type        = number
  default     = 7
}

variable "multi_az" {
  description = "Enable Multi-AZ deployment"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Additional tags for resources"
  type        = map(string)
  default     = {}
} 