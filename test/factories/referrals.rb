# frozen_string_literal: true

FactoryBot.define do
  factory :referral do
    email { Faker::Internet.email }
    state { :sent }
    association :user
  end
end
