import mongoose,{Document, Schema} from "mongoose";

export interface ITask extends Document{
    title: string;
    description?: string;
    status: 'todo' | 'inprogress' | 'underreview' | 'finished';
    priority?: 'low' | ' medium' | 'urgent';
    deadline?: Date;
    createdAt?: Date;
    createdDaysAgo?: number;
    user: mongoose.Schema.Types.ObjectId;
}

const TaskSchema: Schema<ITask> = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    status: {
         type: String,
     enum: ['todo', 'inprogress', 'underreview', 'finished'], 
     required: true 
    },
    priority: { 
        type: String, 
        enum: ['urgent', 'low', 'medium'], 
        default: 'medium'
     },
     deadline: {
        type: Date,
     },
    createdAt: {
         type: Date,
          default: Date.now
         },
    createdDaysAgo:{
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    
  },{timestamps:true});

// Virtual property for createdDaysAgo
// TaskSchema.virtual('createdDaysAgo').get(function (this: ITask) {
//     const now = new Date();
//     const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   });
  
  const Task = mongoose.model<ITask>('Task', TaskSchema);
  
  export default Task;