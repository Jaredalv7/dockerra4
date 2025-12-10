resource "aws_vpc" "hawkins_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "hawkins-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id = aws_vpc.hawkins_vpc.id
  cidr_block = "10.0.1.0/24"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "private" {
  vpc_id = aws_vpc.hawkins_vpc.id
  cidr_block = "10.0.2.0/24"
}
