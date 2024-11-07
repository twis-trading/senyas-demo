!--CONNECT TO DB-->
        <?php
            define("DB_SERVER", "localhost");
            define("DB_USER", "root");
            define("DB_PASSWORD", "");
            define("DB_DATABASE", "rodrizal");

            // Create connection
            $conn = new mysqli(DB_SERVER , DB_USER, DB_PASSWORD, DB_DATABASE);
            // Check connection
            if ($conn->connect_error)
            {
                die("Connection failed: " . $conn->connect_error);
            }
        ?>
<!--END CONNECTION-->
