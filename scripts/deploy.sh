#! /bin/bash

cd angular
ng build

cd ..
firebase deploy
