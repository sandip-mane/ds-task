# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:

# Seed users
john = User.create(first_name: "John", last_name: "Doe", email: "john@example.com", password: "welcome")
oliver = User.create(first_name: "Oliver", last_name: "Smith", email: "oliver@example.com", password: "welcome")

Referral.create(user: john, email: "victor@example.com")
Referral.create(user: oliver, email: "rid@example.com")
