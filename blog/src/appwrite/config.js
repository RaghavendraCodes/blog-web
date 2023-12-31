import conf from '../conf.js'
import {Client, ID, Databases, Storage, Query} from 'appwrite'

export class Service {
    client = new Client(); 
    databases; 
    bucket; 

    // creates a constructor for client service and calls the database and bucket storage accordingly. 
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client); 
        this.bucket = new Storage(this.client); 
    }

    // method to create a post with all the required details. 
    async createPost({title, slug, content, feauturedImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug, 
                {
                    title, 
                    content, 
                    feauturedImage, 
                    status, 
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }

    // method to update a post with all the required details. 
    async updatePost(slug, {title, content, feauturedImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug, 
                {
                    title, 
                    content, 
                    feauturedImage, 
                    status
                }
            )
        } catch (error) {
            throw error; 
        }
    }

    // method to delete a post with all the required datails. 
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug
            )
            return true; 
        } catch (error) {
            throw error; 
            return false;
        }
    }

    // method to get a particular post with all the required datails. 
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug
            )
        } catch (error) {
            throw error; 
            return false 
        }
    }

    // method to get all the list of documents based on the query given.
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                queries, 

            )
        } catch (error) {
            throw error 
            return false
        }
    }

    // method to upload a file. 
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId, 
                ID.unique(), 
                file 
            )
        } catch (error) {
            throw error; 
            return false
        }
    }

    // method to delete a file. 
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId, 
                fileId
            )
        } catch (error) {
            throw error
            return false
        }
    }

    // method to get the file preview. 
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId, 
            fileId
        )
    }

}
const service = new Service()
export default ervice; 