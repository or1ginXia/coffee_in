user_data = {}

# def register_user(username, password):
#     if username in user_data:
#         print("Username already exists. Please choose another one.")
#     else:
#         user_data[username] = password
#         print("User registered successfully.")

def login_user(username, password):
    if username in user_data and user_data[username] == password:
        print("Login successful. Welcome, " + username + "!")
    else:
        print("Login failed. Please check your username and password.")

def main():
    while True:
        print("1. Register")
        print("2. Login")
        print("3. Exit")

        username = input("Enter your username: ")
        password = input("Enter your password: ")
        login_user(username, password)

if __name__ == "__main__":
    main()