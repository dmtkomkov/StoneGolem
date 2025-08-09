# Install Service on Debian 12

## Install packages and configure system services

_curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh_
<br>
_bash nodesource_setup.sh_
<br>
_apt-get install -y nodejs_
<br>
npm install -g @angular/cli

### Install git

_apt install git_

### Install certbot

_apt install certbot python3-certbot-apache_

### Update all packages

_apt-get update_
<br>
_apt-get upgrade_

### Install Apache

_apt install apache2_

### Install and enable apache modules

_a2enmod rewrite_
<br>
_systemctl restart apache2_

### Create apache config

_touch /etc/apache2/sites-available/StoneGolem.conf_

```
<VirtualHost *:80>
    ServerName stonegolem.perforator.xyz
    DocumentRoot /var/www/StoneGolem/dist/stone-golem/browser

    <Directory /var/www/StoneGolem/dist/stone-golem/browser>
        Require all granted
        AllowOverride None
        
        Options +FollowSymLinks
        RewriteEngine On
        
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . index.html [L]
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/StoneGolem_error.log 
    CustomLog ${APACHE_LOG_DIR}/StoneGolem_access.log combined 
</VirtualHost>
```

### Deactivate old and activate new configuration, test and reload apache

_cd /etc/apache2/sites-available/_
<br>
_a2dissite 000-default.conf_
<br>
_rm 000-default.conf_
<br>
_a2ensite StoneGolem.conf_
<br>
_apache2ctl configtest_
<br>
_systemctl reload apache2_

## Install and configure project

### Go to working dir

_cd /var/www_

### Clone repo

_git clone https://github.com/dmtkomkov/StoneGolem.git_

### Go to project folder

_cd StoneGolem_

### Install npm packages

_npm i_

### Build and publish project

_ng build_

## Install Certificate

### Request Certificate

_certbot --apache -d stonegolem.perforator.xyz_

### Automate renew certificate

_crontab -e_

```
31 1 * * * /usr/bin/certbot renew
```
