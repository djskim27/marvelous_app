class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  
  include DeviseTokenAuth::Concerns::SetUserByToken
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname, :image])
    devise_parameter_sanitizer.permit(:account_update, keys: [:nickname, :image])
  end
end
