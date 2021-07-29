#!/bin/bash


echo "This is a bash utility to stop all processes running in background"

echo "clean all currently running docker processes..."
./dockerclean.sh

echo "stop pm2 for react if running"
pm2 stop all

echo "stop all detached process using (jobs)"
