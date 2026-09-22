Feature:Ecommerce validation

    Scenario: place the order 
        Given Ecommerce to login with "usernames" and "passwords"
        When add "ADIDAS ORIGINAL" to Cart
        Then Verify "ADIDAS ORIGINAL" is in the Cart
        # When enter valid details to Place The Order
        # Then Check or verify Order is in the OrderHistory
    