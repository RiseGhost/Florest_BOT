sudo mkdir "VirtualCodeEnv"
sudo mkdir -p "VirtualCodeEnv/proc"
sudo mkdir -p "VirtualCodeEnv/bin"
sudo mkdir -p "VirtualCodeEnv/lib"
sudo mkdir -p "VirtualCodeEnv/lib64"
sudo debootstrap buster "VirtualCodeEnv/"
sudo chroot "VirtualCodeEnv/" /bin/bash -c "apt install python3 -y && apt install gcc -y && apt install nodejs"
