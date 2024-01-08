CREATE TABLE EmeraldAccount
(
    account_id    INT AUTO_INCREMENT PRIMARY KEY,
    account_owner VARCHAR(255)   NOT NULL,
    balance       DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Towns
(
    town_id   INT AUTO_INCREMENT PRIMARY KEY,
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
    account_id    BIGINT,
    campaign_name VARCHAR(255)   NOT NULL,
    keywords      VARCHAR(255)   NOT NULL,
    bid_amount    DECIMAL(10, 2) NOT NULL,
    campaign_fund DECIMAL(10, 2) NOT NULL,
    status        ENUM('ON', 'OFF') NOT NULL,
    town_id       BIGINT REFERENCES Towns (town_id),
    radius        INT            NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES EmeraldAccount (account_id)
);

-- CREATE TABLE CampaignKeywords
-- (
--     campaign_id BIGINT REFERENCES Campaigns (campaign_id),
--     keyword_id  BIGINT REFERENCES Keywords (keyword_id),
--     PRIMARY KEY (campaign_id, keyword_id)
-- );
