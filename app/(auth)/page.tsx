"use client";

import {useState, useEffect} from "react";
import {generateClient} from "aws-amplify/data";
import type {Schema} from "@/amplify/data/resource";
import "../../app/app.css";
import {Amplify} from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
    const [collections, setCollections] = useState<Array<Schema["Collection"]["type"]>>([]);

    function listTodos() {
        client.models.Workspace.create({
            workspaceName: "betoya",
        });

        // client.models.Workspace.observeQuery().subscribe({
        //     next: (data) => console.log(data.items),
        // });

        client.models.Collection.create({
            workspaceName: "betoya",
            collectionName: 'Permission',
            kind: 'component',
        });

        client.models.Collection.observeQuery().subscribe({
            next: (data) => setCollections([...data.items]),
        });
    }

    useEffect(() => {
        listTodos();
    }, []);

    // function deleteTodo(id: string) {
    //     client.models.Todo.delete({id})
    // }
    //
    return (
        <main>
            <pre>{JSON.stringify(collections, null, 4)}</pre>
        </main>
    );
}
