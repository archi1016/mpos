<?php

require('func.php');

QUERY_TABLE($table, $table_id, $timing, $timeout);

P_INIT();

P_ADD('<script>');
P_ADD('var CurrentOrderMode = \''.ORDER_MODE.'\';');
P_ADD('var CurrentTableName = \''.$table.'\';');
P_ADD('OrderDoneSend();');
P_ADD('</script>');

P_PRINT();

?>