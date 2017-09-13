class Api::ComicsController < ApplicationController
    def index
        @user = current_user
        @collection = @user.collection
        @comics = @collection.comics.all 
        render json: @comics
    end
    def create
        @user = current_user
        @collection = @user.collection
        @collection.comics.create(comic_params)
    end
    def destroy
        @comic = Comic.find(params[:id])
        @comic.destroy
    end

    private
    def comic_params
        params.require(:comic).permit(:api_id, :title, :img_url, :description )
    end
end
