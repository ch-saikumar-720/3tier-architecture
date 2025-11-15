variable "subnet_id" {}
variable "vpc_id" {}
variable "instance_type" {
  default = "t3.micro"
}
variable "key_name" {
  description = "EC2 key pair name"
}
variable "ami_id" {
  description = "AMI ID for EC2 instance"
}
