const express = require("express");
const uuid = require("uuid");

const router= express.Router();

let todo_list=[
    {
        id:uuid.v4(),
        title:"First Post",
        completed:false
    },
    {
        id:uuid.v4(),
        title:"Second Post",
        completed:true
    },
    {
        id:uuid.v4(),
        title:"Third Post",
        completed:false
    },
]

router.get("/",function(req,res){
    res.send({"msg":"Welcome to api","links":[{"all_todo":"/api/todo"}]});
})

router.get("/todo",function(req,res){
    res.send(todo_list);
})

router.post("/todo",function(req,res){
    if(!req.body.title){
        res.status(400);
        res.send({"msg":"Title Required"});
        return;
    }    
    let new_todo={
        id:uuid.v4(),
        title:req.body.title,
        completed:false
    }
    todo_list.push(new_todo);
    res.send({"msg":"Todo Created","Item": new_todo});
})

function validateById(id){
    let exists=todo_list.some(function(todo){
        return todo.id==id;
    })
    return exists;
}

function handleToggle(id,callback){
    if(!id){
        callback("Id is required");
        return;
    }
    let exists= validateById(id);
    if(!exists){
        callback("Todo item does not exists");
        return;
    }
    let target_todo=undefined;
    todo_list.forEach(function(todo,index){
        if(todo.id==id){
            target_todo=todo;
            todo.completed=!todo.completed;
        }
    })
    callback(false,target_todo);
}

router.put("/todo/:id",function(req,res){
    let target_id=req.params.id;
    handleToggle(target_id,function(err,updated_todo){
        if(err){
            res.status(400);
            res.send({"msg":err});
            return;
        }
        res.send({"msg":"Todo Toggled","Item":updated_todo});
    })
})

function handleDelete(id,callback){
    if(!id){
        callback("Id is required");
        return;
    }
    let exists= validateById(id);
    if(!exists){
        callback("Todo item does not exists");
        return;
    }
    let deleted_item=undefined;
    todo_list=todo_list.filter(function(todo){
        if(todo.id==id){
            deleted_item=todo;
        }
        return todo.id !== id;
    })
    callback(false,deleted_item);   
}

router.delete("/todo/:id",function(req,res){
    let id=req.params.id;
    handleDelete(id,function(err,deleted_item){
        if(err){
            res.status(400);
            res.send({"msg":err});
            return;
        }
        res.send({"msg":"Todo deleted","Item":deleted_item});
    });
})

module.exports= router;