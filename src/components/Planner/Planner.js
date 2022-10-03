import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/pdfjs-express';
import PageOrientation from '@pdftron/pdfjs-express';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@mui/material';
import PDFJSExpress from '@pdftron/pdfjs-express';
import "./styles.css";

import { useDispatch, useSelector } from 'react-redux';
import { loadXfdf, saveXfdf } from '../../redux/actions/groundplan.js';

var DOCUMENT_ID = 'webviewer-demo-1';

// const saveButton = document.getElementById('custom-save-button')

{/* <object width="400" height="400" data="myFile.pdf" type="application/pdf"></object> */ }

function Planner() {
    const dispatch = useDispatch();
    // i was trying to get global state for xfdf just like posts
    const allXfdfs = useSelector((state) => (state));
    // const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));




    const viewer = useRef(null);




    // Make a GET request to get XFDF string
    const load = (documentId) => {
        console.log("loadxfdf api should be triggered hererererer")
        dispatch(loadXfdf(documentId));


        // return new Promise(function(resolve) {
        //   fetch(`/server/annotationHandler.js?documentId=${documentId}`, {
        //     method: 'GET'
        //   }).then(function(res) {
        //     if (res.status === 200) {
        //       res.text().then(function(xfdfStrings) {
        //         resolve(xfdfStrings);
        //       });
        //     }
        //   });
        // });
    };


    // Make a POST request with document ID, annotation ID and XFDF string
    var saveXfdfStrings = function (documentId, annotationId, xfdfString) {
        console.log(documentId)
        // console.log(annotationId)
        // console.log( xfdfString)
        // ({documentId: documentId, xfdf: JSON.stringify({ xfdfString }), documentName:"" }))
        dispatch(saveXfdf({
            documentId: Date.now(), xfdf: xfdfString, documentName: documentId,
            // for project table --->  annotationsPerDocument:[{documentUrl:documentId,annotations:[xfdfString]}]
        }));
        // dispatch(saveXfdf(JSON.stringify({ xfdfString }), documentId))
        //example request.body additional only this var:
        // "annotationsPerDocument": [
        //     {
        //         "documentUrl": "ashan.cohn",
        //         "annotations": [
        //             "abc",
        //             "dex",
        //             "asdsdad"
        //         ]
        //     },
        //     {
        //         "documentUrl": "second",
        //         "annotations": [
        //             "asdsdad"
        //         ]
        //     }
        // ]


        // return new Promise(function(resolve) {
        //   fetch(`/server/annotationHandler.js?documentId=${documentId}`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       annotationId,
        //       xfdfString
        //     })
        //   }).then(function(res) {
        //     if (res.status === 200) {
        //       resolve();
        //     }
        //   });
        // });
    };



    useEffect(() => {
        console.log(allXfdfs);
        console.log(allXfdfs.groundplan.xfdfs);
        PageOrientation({ title: "MIKASA" })
        dispatch(loadXfdf("62913dc2c20ad70ff7deecfd"));
        // PDFJSExpress({
        //     path: '/public/webviewer',
        //     // licenseKey: 'YOUR_KEY_HERE',
        //   }, document.getElementById('viewer'))
        //     .then(instance => {
        //       // use APIs here
        //     })


        WebViewer(
            {
                isAdminUser: true,
                annotationUser: "ZIDANCE",
                enableFilePicker: true,
                extension: "pdf",
                filename: "groundPlan.pdf",
                path: '/webviewer',
                initialDoc: 'Doc2.pdf',
                // documentId: 'unique-id-789',
                documentId: 'webviewer-demo-1',
                enableMeasurement: true,
                // documentXFDFRetriever: async () => {
                //     const rows = await load("62913dc2c20ad70ff7deecfd");
                //     // return JSON.parse(rows).map(row => row.xfdfString);
                //     return console.log(rows)
                // }
            },
            viewer.current,
            console.log(viewer)
        ).then((instance) => {
            //loading a document
            // instance.UI.loadDocument('https://www.pdftron.com/downloads/pl/test.pdf', {
            //     documentId: '1',
            //     filename: 'sample-1.pdf'
            //   });
            //styling
            // const style = instance.UI.iframeWindow.document.documentElement.style;
            // style.setProperty(`--primary-button`, 'red');
            // style.setProperty(`--primary-button-hover`, 'yellow');
            // const theme = instance.UI.Theme;
            // instance.UI.setTheme(theme.DARK);
            instance.UI.setTheme('dark');




            var docViewer = instance.docViewer;
            var annotManager = docViewer.getAnnotationManager();

            // console.log(docViewer)
            // console.log(annotManager)

            // Save when annotation change event is triggered (adding, modifying or deleting of annotations)
            annotManager.addEventListener('annotationChanged', function (annots, action, options) {
                // If the event is triggered by importing then it can be ignored
                // This will happen when importing the initial annotations from the server or individual changes from other users
                if (options.imported) return;

                annotManager.exportAnnotationCommand().then(function (xfdfStrings) {
                    annots.forEach(function (annot) {
                        //   console.log(DOCUMENT_ID, annot.Id, xfdfStrings)
                        saveXfdfStrings(DOCUMENT_ID, annot.Id, xfdfStrings);
                    });
                });
            });

            //trying to load xfdf from mongo
            async function onAnnotationCreated(data) {
                // data.val() returns the value of server data in any type. In this case, it
                // would be an object with properties authorId and xfdf.
                const [annotation] = await annotManager.importAnnotCommand(data.val().xfdf);
                annotManager.redrawAnnotation(annotation);
                // annotation.authorId = data.val().authorId;
                console.log(data.val().xfdf)
                // WebViewer.getInstance().fireEvent('updateAnnotationPermission', [annotation]);
            }








            //olddd 
            // const { documentViewer, annotationManager } = instance.Core;
            // console.log(instance)
            // console.log(instance.Core)

            // instance.UI.addEventListener(instance.UI.Events.VIEWER_LOADED, () => {
            //     documentViewer.setMargin(20);
            //     documentViewer.addEventListener('fitModeUpdated', fitMode => {
            //         console.log('fit mode changed');
            //         const xfdfString = instance.Core.annotationManager.exportAnnotations();
            //         console.log("xfdfString", xfdfString)
            //     });
            // });


            //             // instance.UI.setTheme({ primary: 'blue', secondary: 'white' });



            //             documentViewer.addEventListener('pageComplete', (pageNumber, canvas) => {
            //                 // here it's guaranteed that page {pageNumber} is fully rendered
            //                 // you can get or set pixels on the canvas, etc
            //                 console.log("page completed")
            //             })

            //             // measure tool
            //             const distanceMeasurementTool = documentViewer.getTool('AnnotationCreateDistanceMeasurement');

            //             distanceMeasurementTool.setStyles(() => ({
            //                 Scale: [[0.25, 'in'], [1, 'in']],
            //                 // value of Precision is a number that means how many decimal places the calculated value should have
            //                 Precision: 0.001
            //             }))
            //             console.log("distance measure tool", distanceMeasurementTool);

            //             documentViewer.addEventListener('documentLoaded', async () => {
            //                 // Get the loaded document's data
            //                 const data = await documentViewer.getDocument().getFileData();
            //                 // Set the file in the SDK
            //                 console.log("docViewer and getfiledata", data)
            //                 // const importedAnnotations = await annotationManager.importAnnotations(xfdf);
            //             })
            //             console.log("doc viewrer::")
            //             console.log(instance.Core.documentViewer)

            //             console.log("annotatiion manager::")
            //             console.log(instance.Core.annotationManager)

            //             console.log("tools::")
            //             console.log(instance.Core.Tools)
            //             console.log("annotations::")
            //             console.log(instance.Core.Annotations)


            //             documentViewer.on('documentLoaded', () => {

            //                 let authorId = null;
            //                 function openReturningAuthorPopup(authorName) {
            //                     // The author name will be used for both PDF.js Express and annotations in PDF
            //                     annotationManager.setCurrentUser(authorName);
            //                     // Open popup for the returning author
            //                     window.alert(`Welcome back ${authorName}`);
            //                 }

            //                 function openNewAuthorPopup() {
            //                     // Open prompt for a new author
            //                     const name = window.prompt('Welcome! Tell us your name :)');
            //                     if (name) {
            //                         updateAuthor(name);
            //                     }
            //                 }
            //                 function updateAuthor(authorName) {
            //                     // The author name will be used for both PDF.js Express and annotations in PDF
            //                     annotationManager.setCurrentUser(authorName);
            //                     // Create/update author information in the server
            //                     // updateAuthor(authorId, { authorName });
            //                     window.alert(`Welcome back ${authorId}`);


            //                 }

            //                 const { annotationManager } = instance.Core;
            //                 annotationManager.addEventListener('annotationChanged', (annotations, action) => {
            //                   if (action === 'add') {
            //                     console.log('this is a change that added annotations');
            //                     console.log(annotations)
            //                     console.log( annotationManager.exportAnnotationCommand())
            //                     console.log( annotationManager.getAnnotCommand())

            //                   } else if (action === 'modify') {
            //                     console.log('this change modified annotations');
            //                   } else if (action === 'delete') {
            //                     console.log('there were annotations deleted');
            //                   }

            //                   annotations.forEach((annot) => {
            //                     console.log('annotation page number', annot.PageNumber);
            //                   });
            //                 });

            //                 async function onAnnotationCreated(data) {
            //                     // data.val() returns the value of server data in any type. In this case, it
            //                     // would be an object with properties authorId and xfdf.
            //                     const [annotation] = await annotationManager.importAnnotCommand(data.val().xfdf);
            //                     annotation.authorId = data.val().authorId;
            //                     annotationManager.redrawAnnotation(annotation);
            //                     console.log(data.val().xfdf)
            //                     // WebViewer.getInstance().fireEvent('updateAnnotationPermission', [annotation]);
            //                 }

            //                 async function onAnnotationUpdated(data) {
            //                     // Import the annotation based on xfdf command
            //                     const [annotation] = await annotationManager.importAnnotCommand(data.val().xfdf);
            //                     // Set a custom field authorId to be used in client-side permission check
            //                     annotation.authorId = data.val().authorId;
            //                     annotationManager.redrawAnnotation(annotation);
            //                 }

            //                 function onAnnotationDeleted(data) {
            //                     // data.key would return annotationId since our server method is designed as
            //                     // annotationsRef.child(annotationId).set(annotationData)
            //                     const command = '<delete><id>' + data.key + '</id></delete>';
            //                     annotationManager.importAnnotCommand(command).then(importedAnnotations => { });
            //                 }
            // })


        });
    }, []);


    return (

        <div className="App"  >
            <div className="webviewer" ref={viewer}></div>
        </div>
    );
}

export default Planner;
