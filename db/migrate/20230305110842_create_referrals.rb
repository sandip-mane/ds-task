# frozen_string_literal: true

class CreateReferrals < ActiveRecord::Migration[7.0]
  def change
    create_table :referrals do |t|
      t.references :user, null: false, foreign_key: true
      t.string :email
      t.integer :state, default: 0

      t.timestamps
    end
  end
end
