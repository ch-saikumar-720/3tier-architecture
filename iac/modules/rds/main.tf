# Security group for RDS
resource "aws_security_group" "rds_sg" {
  name        = "rds-public-sg"
  description = "Allow MySQL access from specified CIDRs"
  vpc_id      = var.vpc_id

  ingress {
    description = "MySQL"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = var.security_group_cidr_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds-public-sg"
  }
}

# DB Subnet Group
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "rds-public-subnet-group"
  subnet_ids = var.public_subnet_ids

  tags = {
    Name = "rds-public-subnet-group"
  }
}

# RDS MySQL instance
resource "aws_db_instance" "mysql" {
  identifier             = "public-mysql-db"
  allocated_storage      = var.db_allocated_storage
  engine                 = "mysql"
  engine_version         = "8.0"
  instance_class         = var.db_instance_class
  db_name                = var.db_name
  username               = var.db_username
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
  publicly_accessible    = true

  tags = {
    Name = "public-mysql-db"
  }
}
