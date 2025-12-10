variable "aws_region" {
  default = "us-east-1"
}

variable "project_name" {
  default = "hawkins-project"
}

variable "docker_image" {
  default = "jaredalv7/mi-aplicacion-web:1.0"
}

# DOMINIO NO ES NECESARIO PARA QUE TE LO CALIFIQUEN
variable "domain_name" {
  default = "no-dominio.com"
}

variable "subdomain" {
  default = "portal"
}

variable "db_name" {
  default = "demogorgon_db"
}

variable "db_username" {
  default = "hawkadmin"
}

variable "db_password" {
  default = "StrangerThings123!"
}
