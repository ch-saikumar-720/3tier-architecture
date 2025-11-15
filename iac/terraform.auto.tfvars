region       = "us-east-1"
project_name = "dev-project"

# EC2
instance_type = "t3.medium"
ami_id        = "ami-0360c520857e3138f"
key_name      = "Project1"

# EKS
eks_version          = "1.29"
eks_cluster_role_arn = "arn:aws:iam::876083391710:role/Project1_EKSClusterRole"
eks_node_role_arn    = "arn:aws:iam::876083391710:role/Project1_EKSNodeRole"
node_instance_type   = "t3.large"
desired_capacity     = 3

# VPC
vpc_cidr             = "10.1.0.0/16"
public_subnet_cidrs  = ["10.1.1.0/24", "10.1.2.0/24"]
private_subnet_cidrs = ["10.1.3.0/24", "10.1.4.0/24"]
azs                  = ["us-east-1a", "us-east-1b"]


# RDS
# =========================================================
db_password          = "YourStrongPass123!"
db_name              = "mydatabase"
db_username          = "admin"
db_instance_class    = "db.t3.medium"
db_allocated_storage = 20
# security_group_cidr_blocks is optional and defaults to 0.0.0.0/0 if not set
