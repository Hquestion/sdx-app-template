// @flow
export const SOURCE_TYPES_OPTION = [
    {
        label: 'SQL DataBase',
        value: 'SQL_DATABASE',
        disabled: false
    },
    // {
    //     label: 'HDFS',
    //     value: 'HDFS',
    //     dsiabled: false
    // },
    {
        label: 'Kafka',
        value: 'KAFKA',
        dsiabled: false
    },
    {
        label: 'Hive',
        value: 'HIVE',
        disabled: true
    },
    {
        label: 'NoSQL',
        value: 'NOSQL',
        disabled: true
    }
];

export const SQL_SERVER_OPTION = [
    {
        label: 'MySQL',
        value: 'MySQL'
    },
    {
        label: 'PostgreSQL',
        value: 'PostgreSQL'
    },
    {
        label: 'SQLServer',
        value: 'SQLServer'
    },
    {
        label: 'HAWQ',
        value: 'HAWQ',
        disabled: true
    }
];

export const SQL_DATABASE_DRIVER_OPTION = [
    {
        label: 'com.mysql.jdbc.Driver',
        value: 'com.mysql.jdbc.Driver'
    },
    {
        label: 'org.postgresql.Driver',
        value: 'org.postgresql.Driver'
    },
    {
        label: 'com.microsoft.sqlserver.jdbc.SQLServerDriver',
        value: 'com.microsoft.sqlserver.jdbc.SQLServerDriver'
    }
];

export const FILE_SUFFIX_FORMAT_MAP = {
    txt: 'TXT',
    csv: 'CSV',
    json: 'JSON',
    orc: 'ORC',
    parquet: 'PARQUET'
};
