module.exports = {
    default: {
        POST: {
            httpCode: '401',
            code: '',
            msg: 'unauthorize'
        },
        DEFAULT: [
            {
                httpCode: '',
                code: '',
                msg: 'server_internal_error'
            },
            {
                httpCode: '400',
                code: '',
                msg: 'Parameter_error'
            },
            {
                httpCode: '401',
                code: '',
                msg: 'unauthorize'
            },
            {
                httpCode: '403',
                code: '',
                msg: 'resource_forbidden'
            },
            {
                httpCode: '404',
                code: '',
                msg: 'resource_not_exist'
            },
            {
                httpCode: '502',
                code: '',
                msg: 'proxy_error'
            },
            {
                httpCode: '',
                code: '130000',
                msg: 'Users_of_the_same_name'
            },
            {
                httpCode: '',
                code: '130001',
                msg: 'User_not_found'
            },
            {
                httpCode: '',
                code: '130002',
                msg: 'Failed_to_create_user'
            },
            {
                httpCode: '',
                code: '130003',
                msg: 'Update_user_failed'
            },
            {
                httpCode: '',
                code: '130004',
                msg: 'Delete_user_failed'
            },
            {
                httpCode: '',
                code: '130005',
                msg: 'Query_user_failed'
            },
            {
                httpCode: '',
                code: '130006',
                msg: 'User disabled'
            },
            {
                httpCode: '',
                code: '130007',
                msg: 'Username_or_password_incorrect'
            },
            {
                httpCode: '',
                code: '130008',
                msg: 'User_expired'
            },
            {
                httpCode: '',
                code: '131000',
                msg: 'Same_name_already_exists'
            },
            {
                httpCode: '',
                code: '131001',
                msg: 'Role_not_found'
            },
            {
                httpCode: '',
                code: '131200',
                msg: 'Same_name_user_group_already_exists'
            },
            {
                httpCode: '',
                code: '131201',
                msg: 'Group_not_found'
            },
            {
                httpCode: '',
                code: '131100',
                msg: 'Same_name_permission_already_exists'
            },
            {
                httpCode: '',
                code: '131101',
                msg: 'Permission_name_not_found'
            },
            {
                httpCode: '',
                code: '131102',
                msg: 'Privileges_already_exist'
            },
            {
                httpCode: '',
                code: '131103',
                msg: 'Failed_to_update_permission'
            },
            {
                httpCode: '',
                code: '131104',
                msg: 'Delete_permission_failed'
            },
            {
                httpCode: '',
                code: '139994',
                msg: 'Not_found'
            },
            {
                httpCode: '',
                code: '139995',
                msg: 'Invalid_parameters'
            },
            {
                httpCode: '',
                code: '139996',
                msg: 'Invalid_request_parameters'
            },
            {
                httpCode: '',
                code: '139997',
                msg: 'Request_parameter_missing'
            },
            {
                httpCode: '',
                code: '139998',
                msg: 'Invalid_mode_of_request'
            },
            {
                httpCode: '',
                code: '139999',
                msg: 'Unknown_error'
            },
            {
                httpCode: '',
                code: '140000',
                msg: 'Incorrect_username'
            },
            {
                httpCode: '',
                code: '140001',
                msg: 'Incorrect_password'
            },
            {
                httpCode: '',
                code: '140002',
                msg: 'User_password_invalid'
            },
            {
                httpCode: '',
                code: '140003',
                msg: 'User_password_expired'
            },
            {
                httpCode: '',
                code: '140010',
                msg: 'The_client_ID_is_incorrect'
            },
            {
                httpCode: '',
                code: '140011',
                msg: 'The_client_password_is_incorrect'
            },
            {
                httpCode: '',
                code: '140012',
                msg: 'Invalid_client_password'
            },
            {
                httpCode: '',
                code: '140013',
                msg: 'Client_password_expired'
            },
            {
                httpCode: '',
                code: '140020',
                msg: 'User_password_or_client_password_has_expired'
            },
            {
                httpCode: '',
                code: '140021',
                msg: 'User_password_or_client_password_has_been_revoked'
            },
            {

                httpCode: '',
                code: '149994',
                msg: 'Not_found'
            },
            {
                httpCode: '',
                code: '149995',
                msg: 'Invalid_parameters'
            },
            {
                httpCode: '',
                code: '149996',
                msg: 'Invalid_parameters'
            },
            {
                httpCode: '',
                code: '149997',
                msg: 'Unauthorized'
            },
            {
                httpCode: '',
                code: '149998',
                msg: 'invalid_password'
            },
            {
                httpCode: '',
                code: '149999',
                msg: 'Unknown_error'
            },
            {
                httpCode: '',
                code: '150201',
                msg: 'Error_querying_service_status'
            },
            {
                httpCode: '',
                code: '159901',
                msg: 'Error_querying_service_status'
            },
            {
                httpCode: '',
                code: '159902',
                msg: 'Parameter_error'
            },
            {
                httpCode: '',
                code: '159903',
                msg: 'Query_result_is_empty'
            },
            {
                httpCode: '',
                code: '159999',
                msg: 'Unknown_error'
            },
            {
                httpCode: '',
                code: '160204',
                msg: 'Template_type_error'
            },
            {
                httpCode: '',
                code: '160205',
                msg: 'Resources_do_not_exist'
            },
            {
                httpCode: '',
                code: '160206',
                msg: 'Misallocation_of_resources'
            },
            {
                httpCode: '',
                code: '160207',
                msg: 'Global_resource_unallocation'
            },
            {
                httpCode: '',
                code: '160208',
                msg: 'Resource_parameter_error'
            },
            {
                httpCode: '',
                code: '160209',
                msg: 'Current_user_resource_allocation_already_exists'
            },
            {
                httpCode: '',
                code: '160210',
                msg: 'Template_exist'
            },
            {
                httpCode: '',
                code: '180101',
                msg: 'Current_project_does_not_exist'
            },
            {
                httpCode: '',
                code: '180102',
                msg: 'Error_in_project_parameters'
            },
            {
                httpCode: '',
                code: '180103',
                msg: 'Project_name_exist'
            },
            {
                httpCode: '',
                code: '180204',
                msg: 'Unsupported_task_types'
            },
            {
                httpCode: '',
                code: '180205',
                msg: 'The_current_task_does_not_exist'
            },
            {
                httpCode: '',
                code: '180206',
                msg: 'Mission_resource_allocation_error'
            },
            {
                httpCode: '',
                code: '180207',
                msg: 'Task_parameter_error'
            },
            {
                httpCode: '',
                code: '180208',
                msg: 'Task_Start_Error'
            },
            {
                httpCode: '',
                code: '180209',
                msg: 'Concurrent_tasks_exceeds_the_platform_limit'
            },
            {
                httpCode: '',
                code: '180210',
                msg: 'Concurrent_high_resource_tasks_exceed_platform_constraints'
            },
            {
                httpCode: '',
                code: '180211',
                msg: 'Tasks_occupied_by_GPU_exceeds_the_platform_limit'
            },
            {
                httpCode: '',
                code: '180212',
                msg: 'Task_name_exist'
            },
            {
                httpCode: '',
                code: '180301',
                msg: 'server_internal_error'
            },
            {
                httpCode: '',
                code: '180304',
                msg: 'server_internal_error'
            },
            {
                httpCode: '',
                code: '180303',
                msg: 'server_internal_error'
            },
            {
                httpCode: '',
                code: '180306',
                msg: 'server_internal_error'
            },
            {
                httpCode: '',
                code: '180307',
                msg: 'Image_Not_Exist'
            },
            {
                httpCode: '',
                code: '190001',
                msg: 'Resources_do_not_exist'
            },
            {
                httpCode: '',
                code: '190002',
                msg: 'Illegal_parameters！'
            },
            {
                httpCode: '',
                code: '190003',
                msg: 'Illegal_parameters'
            },
            {
                httpCode: '',
                code: '190101',
                msg: 'Image_does_not_exist'
            },
            {
                httpCode: '',
                code: '190102',
                msg: 'Illegal_parameters'
            },
            {
                httpCode: '',
                code: '190103',
                msg: 'Illegal_parameters'
            },
            {
                httpCode: '',
                code: '190104',
                msg: 'Illegal_parameters'
            },
            {
                httpCode: '',
                code: '190105',
                msg: 'Image_Pack_does_not_exist'
            },
            {
                httpCode: '',
                code: '190106',
                msg: 'Image_name_and_version_already_exist'
            },
            {
                httpCode: '',
                code: '190107',
                msg: 'Sharing_settings_unchanged'
            },
            {
                httpCode: '',
                code: '190108',
                msg: 'The_current_image_is_not_the_basic_Image'
            },
            {
                httpCode: '',
                code: '190109',
                msg: 'Basic_image_does_not_support_modification'
            },
            {
                httpCode: '',
                code: '190201',
                msg: 'Image_building_tasks_do_not_exist'
            },
            {
                httpCode: '',
                code: '190202',
                msg: 'Image_Construction_Task_Log_does_not_exist'
            },
            {
                httpCode: '',
                code: '190203',
                msg: 'No_log'
            },
            {
                httpCode: '',
                code: '190204',
                msg: 'Basic_image_does_not_exist'
            },
            {
                httpCode: '',
                code: '190205',
                msg: 'Packet_file_does_not_exist'
            },
            {
                httpCode: '',
                code: '190206',
                msg: 'Tar_file_does_not_exist'
            },
            {
                httpCode: '',
                code: '190207',
                msg: 'DockerFile_file_does_not_exist'
            },
            {
                httpCode: '',
                code: '190208',
                msg: 'Basic_image_does_not_exist'
            },
            {
                httpCode: '',
                code: '190209',
                msg: 'Basic_image_unchanged'
            },
            {
                httpCode: '',
                code: '190210',
                msg: 'No_change_in_image_type'
            },
            {
                httpCode: '',
                code: '190211',
                msg: 'Construct_type_unchanged'
            },
            {
                httpCode: '',
                code: '190212',
                msg: 'Node_IP_incorrect'
            },
            {
                httpCode: '',
                code: '190213',
                msg: 'Image_name_already_exists'
            },
            {
                httpCode: '',
                code: '190214',
                msg: 'Unlawful_operation_of_package_change'
            },
            {
                httpCode: '',
                code: '190215',
                msg: 'Parameter_error'
            },
            {
                httpCode: '',
                code: '200001',
                msg: 'Parameter_error'
            },
            {
                httpCode: '',
                code: '200002',
                msg: 'Invalid_parameters'
            },
            {
                httpCode: '',
                code: '200003',
                msg: 'Storage_area_not_found'
            },
            {
                httpCode: '',
                code: '200004',
                msg: 'Storage_space_settings_below_used_capacity'
            },
            {
                httpCode: '',
                code: '200005',
                msg: 'Unsupported_operations'
            },
            {
                httpCode: '',
                code: '209999',
                msg: 'Unknown_error'
            },
            {
                httpCode: '',
                code: '210001',
                msg: 'Request_parameter_missing'
            },
            {
                httpCode: '',
                code: '210002',
                msg: 'Invalid_request_parameters'
            },
            {
                httpCode: '',
                code: '210003',
                msg: 'Documents_or_directories_do_not_exist'
            },
            {
                httpCode: '',
                code: '210004',
                msg: 'File_or_directory_already_exists'
            },
            {
                httpCode: '',
                code: '210101',
                msg: 'Files_or_directories_are_shared'
            },
            {
                httpCode: '',
                code: '210102',
                msg: 'File_Sharing_Not_Found'
            },
            {
                httpCode: '',
                code: '210201',
                msg: 'Mission_does_not_exist'
            },
            {
                httpCode: '',
                code: '210301',
                msg: 'Unallocated_storage_space'
            },
            {
                httpCode: '',
                code: '219999',
                msg: 'Unknown_error'
            },
            {
                httpCode: '',
                code: '230101',
                msg: 'Current_model_does_not_exist'
            },
            {
                httpCode: '',
                code: '230102',
                msg: 'Model_with_the_same_name_already_exists'
            },
            {
                httpCode: '',
                code: '230201',
                msg: 'Model_version_does_not_exist'
            },
            {
                httpCode: '',
                code: '230202',
                msg: 'Model_version_with_the_same_name_already_exists'
            },
            {
                httpCode: '',
                code: '230203',
                msg: 'Model_version_cannot_be_updated'
            },
            {
                httpCode: '',
                code: '230204',
                msg: 'Model_version_is_not_released'
            },
            {
                httpCode: '',
                code: '230205',
                msg: 'Model_version_is_not_offline'
            },
            {
                httpCode: '',
                code: '230206',
                msg: 'Model_version_cannot_be_deleted'
            },
            {
                httpCode: '',
                code: '230301',
                msg: 'Predict_request_exceptions'
            },
            {
                httpCode: '',
                code: '239999',
                msg: 'Unknown_error'
            },
            {
                httpCode: '',
                code: '230001',
                msg: 'Resources_do_not_exist'
            },
            {
                httpCode: '',
                code: '180212',
                msg: 'Tasks_of_the_same_name_already_exist'
            }
        ]
    },
    req: [
        {
            reg: /\/login/,
            messages: {
                POST: [
                    {
                        httpCode: '',
                        code: '9999',
                        msg: 'server_internal_error'
                    }
                ],
                GET: [
                    {
                        httpCode: '',
                        code: '9999',
                        msg: 'server_internal_error'
                    }
                ]
            }
        }
    ]
};
