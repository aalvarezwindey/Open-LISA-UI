# Open LISA UI - Manual

In this manual you have demostrative videos about all the features of the UI. Once the UI is up and running you can:

* Configure the communication with Open LISA Server
* Manage Open LISA Server filesystem
* Register new instruments
* Manage instruments (update, delete, add commands)

## Configure the communication with Open LISA Server

Go to the settings page and choose the communication protocol and its configuration. You can check the connection, if it is OK you will see the green button on the navbar.

You do not know the serial port? Check this [guide](https://www.zaber.com/software/docs/motion-library/ascii/howtos/find_right_port/#:~:text=Open%20Windows%20Device%20Manager.,names%20of%20all%20serial%20ports.)

https://user-images.githubusercontent.com/45921171/188754154-4c5fef08-f377-440a-874d-d9ceb1174dc5.mov

## Manage Open LISA Server filesystem

At the settings page you can also manage the Open LISA Server filesystem. The available folders are:

* `clibs`: here will be the DLLs or C libraries that will be associated with C Lib instruments
* `databases`: you can import and export the databases if you want to share or move your Open LISA setup. It is **important** to keep the same names and paths for databases files. Also, be careful overriding this files since you could lose your databases if you did not back up them.
* `sandbox`: this folder is for any remote bash command that the Server will be doing (for example: post processing, pre processing, etc. it will depend on your use case)

Here you can upload files, delete files and create new folders.

https://user-images.githubusercontent.com/45921171/188755180-0b264492-f19d-4783-a211-baa3f960125e.mov

## Register new instruments

From the main page you can start registering your instruments. There are two kinds of instruments:
* SCPI: for those instruments that implement SCPI protocol
* C Lib: for those instruments that the manufacturer provides C/C++ SDKs.

https://user-images.githubusercontent.com/45921171/188755604-f233a3ea-f9ad-476c-9da0-9fa473b78240.mov

## Manage instruments (update, delete, add commands)

Go to the instrument detail page in order to manage your instruments. You can edit instrument fields, delete them or adding new commands.
It is important to mention, that the Library function specified for C Lib commands must exist in the library, otherwise the command creation will fail. 


https://user-images.githubusercontent.com/45921171/188755967-4a6b714b-f41a-4dac-92ec-e52f0e693a9a.mov

