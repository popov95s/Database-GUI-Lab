$script = <<SCRIPT
#!/usr/bin/env bash

password="hunter2"
project="parkit"
project_virtualenv="parkitenv"
server="192.168.50.4"
username=$SUDO_USER

# Switch to root
sudo su

# Enabled firewall
echo 'Starting firewall in VM...'
yes | ufw enable
ufw allow OpenSSH

# Update latest packages
echo 'Updating packages...'
apt-get update

# Install MySQL + dependencies
echo 'Installing MySql...'
export DEBIAN_FRONTEND=noninteractive
debconf-set-selections <<< "mysql-server-5.5 mysql-server/root_password password $password"
debconf-set-selections <<< "mysql-server-5.5 mysql-server/root_password_again password $password"
apt-get -y install mysql-server 

# Install curl
echo 'Installing cURL...'
apt-get -y install curl

# Install git
echo 'Installing Git...'
apt-get -y install git

# Install vim
echo 'Installing Vim...'
apt-get -y install vim

# Install Python & pip
echo 'Intalling Python and pip...'
apt-get -y install python-dev
apt-get -y install python-pip

# Set up project directory w/ dependencies
echo 'Installing Python packages...'
pip install virtualenv
pip install uwsgi
pip install flask
pip install flask-login
pip install flask-sqlalchemy

# —-start up virtualenv to install dependencies
echo 'Creating project...'
mkdir ${project}
cd ${project}

# --make default flask directory setup
mkdir templates
mkdir static

# --start up virtualenv
virtualenv ${project_virtualenv}
source ${project_virtualenv}/bin/activate

# —-install dependencies
echo 'Installing project dependencies...'
pip install uwsgi flask flask-login flask-sqlalchemy

# —-set up basic app file
cp /vagrant/.provision/flask/project.py .
mv project.py ${project}.py

# --set up app starter file
cp /vagrant/.provision/flask/wsgi.py .
sed -i 's/myproject/'"${project}"'/g' wsgi.py

# --set up .ini file
cp /vagrant/.provision/uwsgi/myproject.ini .
mv myproject.ini ${project}.ini
sed -i 's/myproject/'"${project}"'/g' ${project}.ini

# --deactivate virtualenv & move out of directory
deactivate
cd $HOME

# --fix permissions
echo 'Fixing permissions...'
chown -R ${username}: /home/${username}/${project}/

# Configure uWSGI server w/ systemd 
echo 'Configuring uWSGI server with systemd...'
cp /vagrant/.provision/uwsgi/myproject.service /etc/systemd/system/
sed -i '5,10s/user/'"${username}"'/g' /etc/systemd/system/myproject.service
sed -i 's/myproject/'"${project}"'/g' /etc/systemd/system/myproject.service
mv /etc/systemd/system/myproject.service /etc/systemd/system/${project}.service

# --enable service with systemd
systemctl start ${project}
systemctl enable ${project}

# Install and configure nginx
echo 'Installing nginx...'
apt-get -y install nginx

# --copy config file
cp /vagrant/.provision/nginx/myproject.nginx /etc/nginx/sites-available
mv /etc/nginx/sites-available/myproject.nginx /etc/nginx/sites-available/${project}
sed -i 's/user/'"${username}"'/g' /etc/nginx/sites-available/${project}
sed -i 's/myproject/'"${project}"'/g' /etc/nginx/sites-available/${project}

# --symlink the file to /etc/nginx/sites-enabled
ln -s /etc/nginx/sites-available/${project} /etc/nginx/sites-enabled

# --remove default nginx site from sites-available/sites-enabled
rm /etc/nginx/sites-available/default
rm /etc/nginx/sites-enabled/default

# --restart nginx service to reflect changes
systemctl restart nginx

# --configure firewall to allow nginx
echo 'Finishing up...'
ufw allow 'Nginx Full'

SCRIPT

Vagrant.configure("2") do |config|
  # Base VM (Ubuntu 16.04)
  config.vm.box = "bento/ubuntu-16.04"

  config.vm.provider :virtualbox do |p|
    # This makes the RAM 2GB... modify if 2GB is too much for your host machine
    p.customize ['modifyvm', :id, '--memory', '2048']
  end

  # Use the script above to provision the vm
  config.vm.provision "shell", inline: $script

  # Set up private networking
  config.vm.network "private_network", ip: "192.168.50.4"
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 5000, host: 5000

end
