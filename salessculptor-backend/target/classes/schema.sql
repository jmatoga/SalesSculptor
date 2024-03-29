CREATE TABLE Emerald_Account
(
    account_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_owner VARCHAR(255)   NOT NULL,
    balance       DECIMAL(10, 2) NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Emerald_Account_Pass
(
    username      varchar(40),
    password_hash varchar(255),
    salt          varchar(50),
    account_id    BIGINT REFERENCES Emerald_Account (account_id)
);

CREATE TABLE Towns
(
    town_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    town_name VARCHAR(100) UNIQUE
);

CREATE TABLE Products
(
    product_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_name  VARCHAR(255)   NOT NULL,
    product_desc  TEXT           NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Keywords
(
    keyword_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    keyword_name VARCHAR(255) NOT NULL
);

CREATE TABLE Campaigns
(
    campaign_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id    BIGINT REFERENCES Products (product_id),
    account_id    BIGINT REFERENCES Emerald_Account (account_id),
    campaign_name VARCHAR(255)       NOT NULL,
    keywords      VARCHAR(255)       NOT NULL,
    bid_amount    DECIMAL(10, 2)     NOT NULL,
    campaign_fund DECIMAL(10, 2)     NOT NULL,
    status        ENUM ('ON', 'OFF') NOT NULL,
    town_id       BIGINT REFERENCES Towns (town_id),
    radius        INT                NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
