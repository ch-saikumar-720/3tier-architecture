variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "ami_id" {
  description = "AMI ID"
  type        = string
  default     = "ami-0c55b159cbfafe1f0"
}

variable "key_name" {
  description = "Name of the existing AWS key pair to use for SSH"
  type        = string
}

variable "project_name" { default = "custom-vpc" }
variable "eks_version" { default = "1.29" }
variable "eks_cluster_role_arn" {}
variable "eks_node_role_arn" {}
variable "node_instance_type" { default = "t3.medium" }
variable "desired_capacity" { default = 2 }

# VPC
variable "vpc_cidr" { default = "10.0.0.0/16" }
variable "public_subnet_cidrs" {
  default = ["10.0.1.0/24", "10.0.2.0/24"]
}
variable "private_subnet_cidrs" {
  default = ["10.0.3.0/24", "10.0.4.0/24"]
}
variable "azs" {
  default = ["us-east-1a", "us-east-1b"]
}

variable "vpc_id" {
  description = "ID of the VPC"
  type        = string
  default     = "" # empty default means it’s optional
}

variable "public_subnet_ids" {
  type    = list(string)
  default = []
}


variable "db_password" {
  description = "RDS MySQL password"
  type        = string
  sensitive   = true
}

variable "security_group_cidr_blocks" {
  description = "List of CIDR blocks allowed to access RDS"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "db_name" {
  description = "The name of the MySQL database"
  type        = string
  default     = "mydb"
}

variable "db_username" {
  description = "The username for the MySQL database"
  type        = string
  default     = "admin"
}

variable "db_instance_class" {
  description = "The RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_allocated_storage" {
  description = "Allocated storage for RDS in GB"
  type        = number
  default     = 20
}



