- Design backend service
    - nodejs
    - mvc
    - RESful API
    
1. Collection / Model:
    - User
        - username
        - password
        - name
        - avatar
        - email
        - active
    - Image
        - url
        - view
        - like
        - createdAt
        - createdBy
        - title
        - description
        - active
        - Comment
            - content
            - createdBy
            - createdAt

2. Controller
    - CRUD
    
3. Router
    - Router server-side tra ve data khong tra ve html (JSON)
    - RESTful
        - Get -> Read : /api/images?page=2 
        - POST -> create: /api/images
        - PUT -> update: /api/images/:id
        - delete -> delete: /api/images/:id
        
4. Cooked Data
    - Get user: username, avatar, name 