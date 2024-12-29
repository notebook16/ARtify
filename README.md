# Text-to-Image Generator Website

This is a full-stack **MERN** application for generating images from text using multiple open-source models, including **Stable Diffusion 3.5 Lab** and **Forest Lab** hosted on **Hugging Face**. The application provides a quick and detailed text-to-image conversion with persistent chat capabilities and one-click download.

## Features

1. **Quick Mode Text-to-Image**  
   Generates images from text using the **Pollination.ai** API for fast results.

2. **Detailed Mode Text-to-Image**  
   Allows for higher-quality image generation with **Stable Diffusion** and **Forest Lab** models.

3. **Persistent Chat**  
   The chat is persistent using **Cloudinary** to convert API response blobs and save them in the Cloudinary cloud.

4. **One-Click Download**  
   Users can easily download the generated images with a single click.

5. **User Authentication**  
   Secure user authentication with registration, login, and session management.

6. **Unlimited Use**  
   The website allows unlimited usage, giving users full access to the text-to-image generation tools.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB (for user authentication)
- **Cloud Storage**: Cloudinary (for storing chat images)
- **API**: Hugging Face APIs (for image generation)
- **Authentication**: JWT (JSON Web Token) for user sessions

## Setup

### Prerequisites

1. **Node.js and npm**  
   Make sure Node.js and npm are installed. You can download and install them from [nodejs.org](https://nodejs.org/).

2. **MongoDB**  
   You will need a MongoDB instance for storing user data. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud database or set up a local MongoDB instance.

3. **Hugging Face API Key**  
   Sign up at [Hugging Face](https://huggingface.co/) and generate your API key.

4. **Cloudinary API Key**  
   Create an account at [Cloudinary](https://cloudinary.com/) and get your API keys to manage image storage.

### Clone the Repository

Clone the repository to your local machine:

```bash
https://github.com/notebook16/ARtify.git
cd text-to-image-generator
Here is the entire README in markdown format:

### Install Dependencies

Install both frontend and backend dependencies:

#### Backend (Server)

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install the dependencies:

```bash
npm install
```

#### Frontend (Client)

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install the dependencies:

```bash
npm install
```

### Configuration

1. **Hugging Face API Key**  
   Create a `.env` file in the `backend` directory and add the Hugging Face API key:

```
HUGGING_FACE_API_KEY=your_hugging_face_api_key
```

2. **Cloudinary API Key**  
   In the `backend` directory, create a `.env` file and add the Cloudinary API credentials:

```
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

3. **MongoDB URI**  
   Set up your MongoDB URI in the `.env` file:

```
MONGO_URI=mongodb://localhost:27017/text-to-image-db
```

   Or, if you're using MongoDB Atlas, use the connection string provided in your Atlas dashboard.

### Running the Application

#### Backend

1. In the `backend` directory, run:

```bash
npm start
```

This will start the backend server on `http://localhost:5000`.

#### Frontend

1. In the `frontend` directory, run:

```bash
npm start
```

This will start the frontend on `http://localhost:3000`.

Now, your application should be running, and you can access it in your browser.

## API Documentation

### Hugging Face API (Image Generation)

To use the Hugging Face models for text-to-image generation, you will need an API key. Follow these steps:

1. Go to [Hugging Face](https://huggingface.co/).
2. Create an account and navigate to your [API keys page](https://huggingface.co/settings/tokens).
3. Generate a new API key and use it in your `.env` file.

### Cloudinary API (Image Storage)

To store generated images in Cloudinary:

1. Create an account at [Cloudinary](https://cloudinary.com/).
2. Go to the [Dashboard](https://cloudinary.com/console).
3. Copy the **API Key**, **API Secret**, and **Cloud Name**, and use them in your `.env` file as described above.

## Contributing

1. Fork the repository.
2. Clone your forked repository.
3. Create a new branch (`git checkout -b feature-name`).
4. Make changes and commit them (`git commit -am 'Add feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to **Hugging Face** for providing the text-to-image models.
- Thanks to **Cloudinary** for providing image storage services.
- Inspiration from various open-source text-to-image generators.

```

### Key Points in the README:

1. **Features**: Lists all the features of your website.
2. **Technologies Used**: A brief list of tech stack and libraries used in the project.
3. **Setup Instructions**: Detailed steps for setting up both the frontend and backend, including environment variables for Hugging Face and Cloudinary APIs.
4. **API Documentation**: Guidance on using Hugging Face and Cloudinary APIs.
5. **Contributing**: How others can contribute to your project.
6. **License**: Information on licensing (MIT License in this case).

Make sure to replace `your_hugging_face_api_key`, `your_cloudinary_cloud_name`, etc., with your actual credentials.



