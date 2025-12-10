resource "aws_acm_certificate" "stranger_cert" {
  domain_name       = "${var.subdomain}.${var.domain_name}"
  validation_method = "DNS"
}
