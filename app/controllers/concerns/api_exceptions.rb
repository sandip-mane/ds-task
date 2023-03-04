# frozen_string_literal: true

module ApiExceptions
  extend ActiveSupport::Concern

  included do
    protect_from_forgery

    rescue_from StandardError, with: :handle_api_exception

    def handle_api_exception(exception)
      case exception
      when ActiveRecord::RecordNotFound
        render_error("#{exception.model} not found with given details", :not_found)

      when ActiveRecord::RecordNotUnique
        render_error(exception)

      when ActiveModel::ValidationError, ActiveRecord::RecordInvalid, ArgumentError
        error_message = exception.message.gsub("Validation failed: ", "")
        render_error(error_message, :unprocessable_entity)

      else
        render_error(exception, :internal_server_error)
      end
    end
  end
end
