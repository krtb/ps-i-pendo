from csv2json import convert # Source => https://github.com/oplatek/csv2json/blob/master/README.md

"""
Abstracted string variables to remove room for error.
Variables:
    input_csv_file_path: path to where your csv file is located
    csv_file_name: name of csv file you wish to convert to json
    csv_type: the csv file extension type
    output_json_file_path: path to where your json file will be output
    new_json_title: a title of your choosing for your newly created json file
    json_type: the json file extension type
Returns:
    An interpolated string using f-strings, python ^3.6
"""
# CSV Variables
input_csv_file_path='../csv_files/'
csv_file_name='2022-07-23_beepro_account_remap'
csv_type='.csv'

# JSON Variables
output_json_file_path='../json_files/'
new_json_title ='kb_test_5'
json_type='.json'

input_csv_file_path = (f'{input_csv_file_path}{csv_file_name}{csv_type}')
out_json_file_path = (f'{output_json_file_path}{new_json_title}{json_type}')

"""
Converts a CSV file to a JSON file.
Arguments:
    input_csv_file_path: a csv file path to the file you wish to convert
    new_json_file_name: a file name of your choosing
Returns:
    A JSON file
"""
with open(input_csv_file_path) as r, open(out_json_file_path, 'w') as w:
    convert(r, w)