class CreateComics < ActiveRecord::Migration[5.1]
  def change
    create_table :comics do |t|
      t.references :collection, foreign_key: true
      t.integer :api_id
      t.string :title
      t.string :thumbnail
   
    

      t.timestamps
    end
  end
end
