variable "aws_region" {
  description = "AWS region for the S3 bucket"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Name used for AWS resources"
  type        = string
  default     = "yogesh-portfolio"
}
