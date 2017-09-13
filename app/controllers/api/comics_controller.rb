class Api::ComicsController < ApplicationController
    def index
        @user = current_user
        @collection = @user.collection
        @comics = @collection.comics.all 
        render json: @comics
    end
    def new
        @comic = Comic.new
    end
    def create
        @user = current_user
        @collection = @user.collection
        @comic = @collection.comics.create(comic_params)
    end
    def destroy
        @comic = Comic.find(params[:id])
        @comic.destroy
    end

    private
    def comic_params
        params.require(:comic).permit(:api_id, :title, :thumbnail)
    end
end
