#!/bin/bash

# Script to remove and reinstall @matching-platform/payment-widget from GitHub
# This ensures we get the latest version from the git repository

echo "Removing @matching-platform/payment-widget from node_modules..."
rm -rf node_modules/@matching-platform/payment-widget

echo "Removing package from package-lock.json..."
npm uninstall @matching-platform/payment-widget

echo "Installing updated @matching-platform/payment-widget from GitHub..."
npm install github:nirnaykulshreshtha/payment-widget

echo "Payment widget package update completed!"

