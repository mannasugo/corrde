## `corrde`

Job Hailing and Outsourcing Web Service With NodeJS, MYSQL & NGINX

### `corrde` ?

"Corrde" is a stylized approach at abbreviating the service's core features which are, "mapping coordinates" and "coordinating freelance services"

## Installing and running `corrde` on a local environment (Ubuntu Linux)

###Prerequisites

###### Please ensure your target Ubuntu machine is non root user with `sudo` capabilities

1. ``npm``
2. ```NodeJS```
3. ````mysql-server````
4. ``nginx``

####Install `node.js` and `npm`

Node.js is available in Ubuntu repository and you can easily install it in a few commands

```shell
sudo apt install nodejs
```

and install npm

```shell
sudo apt install npm
```

#### Install `nginx` as a proxy server for static resources

Install Nginx

```shell
sudo apt install nginx
```

Adjusting `NGINX` configuration file:

1. Now we need to configure `nginx` as a proxy for our directory level resources. Your `nginx.conf` file; located in the `/etc/nginx/` directory, should explicitly look like this:
```conf

#user  nobody;
worker_processes auto;

pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    sendfile        on;

    keepalive_timeout  65;

    gzip on;
		
    server {
    	listen 80 default_server;
    	listen [::]:80 default_server;
    	
    	return 301 https://$host$request_uri;
    	
    }
    
    server {
    
      listen 443 ssl http2;
      
      ssl_certificate   /var/www/corrde/http2/ssl/server.crt;
      ssl_certificate_key   /var/www/corrde/http2/ssl/server.key;
      ssl_protocols TLSv1.2 TLSv1.3;
      ssl_ciphers  HIGH:!aNULL:!MD5;
      ssl_prefer_server_ciphers  on;
      
      location / {
        proxy_pass https://127.0.0.1:8124;
      }
      
      location /gp {
        root /etc/corrde;
       }		
       
    }
}
```

You need to restart `nginx` to reload the new configuration file.

```shell
sudo systemctl restart nginx
```

####Install `mysql`

```shell

sudo apt-get update
sudo  apt-get install mysql-server

```

###### If the secure installation utility does not launch automatically after the installation completes, enter the following command:

```shell
sudo mysql_secure_installation utility
```

1. Make sure you are running a secure `mysql-server`, to facilitate `nodejs` access. For versions earlier than `MYSQL 5.7`, enter the following command in the `mysql` shell, replace `password` with your new password:

```mysql
UPDATE mysql.user SET Password = PASSWORD('password') WHERE User = 'root';
```

 or for versions after `MYSQL 5.7` run:

```mysql
UPDATE mysql.user SET authentication_string = PASSWORD('password') WHERE User = 'root';
```

To make the changes take effect, reload the stored user information with the following command:

```mysql
FLUSH PRIVILEGES
```

#### Running `corrde`

1. Clone `corrde` github repository at local directory `/var/www/`

   ```shell
    git clone https://github.com/mannasugo/corrde/
   ```
2. Install `package` dependencies with `npm`

    ```shell
    npm install
    ```
3. Adjust `mysql` access credentials to your credentials for `node-mysql` module, alter `/var/www/corrde/corrde-config.js` at this section:

    ```js
    sqlPass: {
      h: `localhost`,
      u: `root`,
      p: `Mann2asugo`,
      d: `corrde`}
    ```
   to
   
   ```js
    sqlPass: {
      h: `localhost`,
      u: `root`,
      p: `(Your Mysql Password)`, //assign your system mysql password to this element 
      d: `corrde`}
    ```

4. Run `nodejs package`

    ```shell
    npm start
    ```
    
5. Access `local_env` in browser:

    ```shell
    https://localhost
    ```