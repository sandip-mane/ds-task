# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  include ApiResponders
  include ApiExceptions
  include Authenticatable
end
