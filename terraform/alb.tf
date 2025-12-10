resource "aws_lb" "upside_portal" {
  name               = "upside-portal"
  internal           = false
  load_balancer_type = "application"
  subnets            = [aws_subnet.public.id]
}
