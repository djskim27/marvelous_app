# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all

richard = User.create(email: 'djs.kim27@gmail.com', password:'october27', password_confirmation:'october27')
richard.collection = Collection.create()
richard.collection.comics = [
    Comic.create()
]