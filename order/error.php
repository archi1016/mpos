<?php

require('func.php');

P_INIT();

P_ADD('<script>');
P_ADD('OrderError('.RET_INT_GET(ARGUMENT_ERROR_CODE).');');
P_ADD('</script>');

P_PRINT();

?>