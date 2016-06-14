<?php

require('func.php');

QUERY_TABLE($table, $table_id, $timing, $timeout);

P_INIT();

P_ADD('<script>');
P_ADD('var CurrentOrderMode = \''.ORDER_MODE.'\';');
P_ADD('var CurrentTableName = \''.$table.'\';');
P_ADD('var CurrentTableTiming = \''.$timing.'\';');
P_ADD('var CurrentOrderTimeout = \''.$timeout.'\';');
P_ADD('OrderInit();');
P_ADD('</script>');

P_PRINT();

?>