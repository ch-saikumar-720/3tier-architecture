output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "public_subnets" {
  value = aws_subnet.public[*].id # list of public subnet IDs
}

output "private_subnets" {
  value = aws_subnet.private[*].id # list of private subnet IDs
}
