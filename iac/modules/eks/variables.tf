variable "project_name" {
  default = "custom-vpc"
}

variable "eks_version" {
  default = "1.29"
}

variable "node_instance_type" {
  default = "t3.medium"
}

variable "desired_capacity" {
  default = 2
}

variable "eks_cluster_role_arn" {
  description = "IAM role ARN for EKS cluster (manually created)"
}

variable "eks_node_role_arn" {
  description = "IAM role ARN for EKS node group (manually created)"
}
variable "subnet_ids" {
  description = "List of subnet IDs for EKS cluster and node group"
  type        = list(string)
}
