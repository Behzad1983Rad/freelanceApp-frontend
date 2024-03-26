ReadMe- Work Wise Project
 
Description

Work Wise is a web application built using Django in the backend and React in the frontend, utilising Django REST Framework for API development. The project also incorporates AWS for uploading images and PostgreSQL for the database. Work Wise provides authentication functionality, allowing users to sign up, sign in, and sign out. Each user has their panel where they can manage employees and perform CRUD operations. Additionally, employees can add and manage jobs with CRUD operations. AWS is used to enable employees to upload their profile photos.

Deployment link

The application is deployed both for the backend and frontend. You can access the frontend via the following link: 
https://freelanceapp-frontend-production.up.railway.app

Getting Started/Code Installation
To run the project locally, follow these steps:
Clone the frontend and backend repositories from GitHub.
Navigate to the backend directory and run the Django server:
For Mac: 
python3 manage.py runserver
For Windows: 
python manage.py runserver
Create a PostgreSQL database on your local machine and perform migrations:
python manage.py makemigrations
python manage.py migrate
Navigate to the frontend directory and install dependencies:
npm install
Start the React development server:
npm start









Timeframe & Working Team (Solo/Pair/Group)

The project was completed independently over one week.


Technologies Used
Django
Python
PostgreSQL
React
AWS
RESTFramework


Brief
This project was developed as part of a software engineering bootcamp and implemented using Django in the backend and React in the frontend, leveraging Django Rest Framework for API development. The objective of the project was to create a web application where users could manage employees and jobs. The website features authentication functionality, allowing each user to have their own platform. Users can perform CRUD operations to manage their employees and jobs effectively. Additionally, the application utilizes AWS for uploading and managing profile photos. The project was completed within a one-week timeframe.




Planning

During the planning stage, ERD was used for database design, and Excalidraw was utilized for note-taking and sketching. 







Build/Code Process

Initial Setup and Configuration:
Started by setting up the Django project structure and configuring the backend environment.
Created Django models to define the database schema, including CompanyProfile, JobListing, and Photo.
Implemented serializers using Django Rest Framework to transform complex data types into JSON responses.
Configured URL routing in urls.py to map URLs to views and API endpoints.

# models.py
from django.db import models
from django.contrib.auth.models import User

class CompanyProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True)

class JobListing(models.Model):
    company = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=100)
    salary = models.CharField(max_length=100, blank=True)
    application_deadline = models.DateTimeField()

    def __str__(self):
        return self.title

class Photo(models.Model):
    url = models.FileField(max_length=200)
    profile = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE)

    def __str__(self):
        return f"Photo for profile_id: {self.profile_id} @{self.url}"

# serializers.py
from rest_framework import serializers
from .models import *

class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = ['id', 'user', 'name', 'description', 'website', 'url']

User Authentication and Authorization:
Utilized Django's built-in authentication system for user management.
Implemented token-based authentication using Django Rest Framework Simple JWT for API authentication.
Ensured proper permission settings to restrict access to authenticated users only.
# views.py
from django.contrib.auth.models import Group, User
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.http import JsonResponse
from rest_framework import permissions, viewsets, parsers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from .serializers import *

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.create(username=username, email=email)
            user.set_password(password)
            user.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

REST API Endpoint Development:
Developed REST API endpoints to handle CRUD operations for managing company profiles, job listings, and other resources.
Utilized Django Rest Framework's viewsets and serializers to simplify API development and handle data serialization.
Implemented custom API views for user authentication, signup, and logout functionalities.
# views.py
class CompanyProfileViewSet(viewsets.ModelViewSet):
    serializer_class = CompanyProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CompanyProfile.objects.filter(user=user)

    def post(self, request):
        user = request.user
        name = request.data.get('name')
        description = request.data.get('description')
        website = request.data.get('website')
        try:
            company = CompanyProfile.objects.create(name=name, description=description, website=website, user=user)
            company.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

Components
Add Job Form
The AddJobForm component allows users to submit new job listings. It uses React hooks to manage form data, fetches the list of companies from the backend, and sends a POST request to add a new job.
// AddJobForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



Company Profile
The CompanyProfile component displays detailed information about a company. It fetches data from the backend, including the company's name, description, website, and photo. Users can delete the profile or trigger the edit modal.
// CompanyProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import EditProfileModal from './EditProfileModal';


Edit Profile Modal
The EditProfileModal component provides a modal for editing company profile details. Users can modify the name, description, and website before saving changes.
// EditProfileModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Edit Profile Modal component



Edit Job Modal
The EditJobModal component is similar to the edit profile modal but tailored for job listings. Users can update the company, title, description, location, salary, and application deadline.
// EditJobModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Modal, Button } from 'react-bootstrap';

// Edit Job Modal component

Authentication Process: Frontend
Components
Login Form
The LoginForm component allows users to sign in. It captures the username and password, sends a POST request to the backend for authentication, and stores the access and refresh tokens upon successful login.
// LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

Signup Form
The Signup component enables users to register for a new account. It collects the username, email, and password, sends a POST request to the backend for registration, and stores the access and refresh tokens upon successful signup.
// Signup.js
import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

Logout
The Logout component handles user logout functionality. It sends a POST request to the backend to invalidate the refresh token and clears the stored tokens upon successful logout.
// Logout.js
import React, { useEffect } from "react";
import axios from "axios";

// Logout component

Utility
Current User
The currentUser function retrieves the user ID from the access token stored in local storage. It is used to obtain the current user's information for various components.
// currentUser.js
import { jwtDecode } from "jwt-decode";

// Current User function

Axios Interceptor
The Axios interceptor handles authentication-related errors, such as 401 Unauthorized responses. It automatically refreshes the access token using the refresh token stored in local storage and retries the failed request.
// axios.js
import axios from "axios";

// Axios Interceptor

Integration
Ensure that these components are integrated into your frontend application and used appropriately for user authentication and authorization.
This section outlines the frontend authentication process, including login, signup, logout functionality, and utility functions for user management. Customize the components and integration based on your project requirements. If you have any questions or need further clarification, feel free to ask!








Challenges

Challenges
Technical Challenges:
Integration of Django and React: Integrating Django in the backend with React in the frontend posed challenges due to the need for seamless communication between the two frameworks.
Token-based Authentication: Implementing token-based authentication using Django Rest Framework Simple JWT required understanding complex authentication flows and handling token management effectively.
Team Dynamics/Project Management:
As the project was completed independently, there were no team dynamics or project management challenges. However, managing time effectively and maintaining motivation throughout the one-week timeframe presented personal challenges.
Tools/Tech Used:
AWS Integration: Incorporating AWS for image uploading and management required configuring permissions and ensuring seamless integration with Django, which posed challenges due to the complexity of AWS services.



Wins
Successful Integration of Django and React: Overcoming the challenges of integrating Django and React resulted in a smoothly functioning web application with efficient communication between the frontend and backend.
Effective Authentication Implementation: Implementing token-based authentication provided a secure and seamless user authentication process, enhancing the overall user experience.



Key Learnings/Takeaways

Enhanced Confidence in Technologies/Tools:
Django and React: Through this project, I gained a deeper understanding of both Django and React, making me more confident in utilizing these frameworks for future projects.
AWS Integration: Learning to integrate AWS services expanded my skill set, providing valuable experience in utilizing cloud services for various functionalities.
Improved Engineering Processes:
Effective Project Management: Managing the project independently within a one-week timeframe improved my time management skills and self-discipline, essential for successful project completion.
Technical Problem Solving: Dealing with technical challenges during the development process enhanced my problem-solving abilities and critical thinking skills, preparing me for tackling similar issues in future projects.



Bugs

No bugs were identified during the development of the project.



Future Improvements
Looking ahead, we're excited to expand our platform's capabilities by introducing freelance functionality. This upcoming feature will enable users to seamlessly connect with freelancers for their projects, further enhancing the versatility of our platform. Stay tuned as we work diligently to bring this exciting addition to fruition, empowering users with even more opportunities for collaboration and growth.





