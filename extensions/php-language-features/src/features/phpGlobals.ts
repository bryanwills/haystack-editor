/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// file generated from PHP53Schema.xml using php-exclude_generate_php_globals.js

export interface IEntry { description?: string; signature?: string }
export interface IEntries { [name: string]: IEntry }

export const globalvariables: IEntries = {
	$GLOBALS: {
		description: 'An associative array containing references to all variables which are currently defined in the global scope of the script. The variable names are the keys of the array.',
	},
	$_SERVER: {
		description: '$_SERVER is an array containing information such as headers, paths, and script locations. The entries in this array are created by the web server. There is no guarantee that every web server will provide any of these; servers may omit some, or provide others not listed here. That said, a large number of these variables are accounted for in the CGI/1.1 specification, so you should be able to expect those.',
	},
	$_GET: {
		description: 'An associative array of variables passed to the current script via the URL parameters.',
	},
	$_POST: {
		description: 'An associative array of variables passed to the current script via the HTTP POST method.',
	},
	$_FILES: {
		description: 'An associative array of items uploaded to the current script via the HTTP POST method.',
	},
	$_REQUEST: {
		description: 'An associative array that by default contains the contents of $_GET, $_POST and $_COOKIE.',
	},
	$_SESSION: {
		description: 'An associative array containing session variables available to the current script. See the Session functions documentation for more information on how this is used.',
	},
	$_ENV: {
		description: 'An associative array of variables passed to the current script via the environment method. \r\n\r\nThese variables are imported into PHP\'s global namespace from the environment under which the PHP parser is running. Many are provided by the shell under which PHP is running and different systems are likely running different kinds of shells, a definitive list is impossible. Please see your shell\'s documentation for a list of defined environment variables. \r\n\r\nOther environment variables include the CGI variables, placed there regardless of whether PHP is running as a server module or CGI processor.',
	},
	$_COOKIE: {
		description: 'An associative array of variables passed to the current script via HTTP Cookies.',
	},
	$php_errormsg: {
		description: '$php_errormsg is a variable containing the text of the last error message generated by PHP. This variable will only be available within the scope in which the error occurred, and only if the track_errors configuration option is turned on (it defaults to off).',
	},
	$HTTP_RAW_POST_DATA: {
		description: '$HTTP_RAW_POST_DATA contains the raw POST data. See always_populate_raw_post_data',
	},
	$http_response_header: {
		description: 'The $http_response_header array is similar to the get_headers() function. When using the HTTP wrapper, $http_response_header will be populated with the HTTP response headers. $http_response_header will be created in the local scope.',
	},
	$argc: {
		description: 'Contains the number of arguments passed to the current script when running from the command line.',
	},
	$argv: {
		description: 'Contains an array of all the arguments passed to the script when running from the command line.',
	},
	$this: {
		description: 'Refers to the current object',
	},
};
export const compiletimeconstants: IEntries = {
	__CLASS__: {
		description: 'The class name. (Added in PHP 4.3.0) As of PHP 5 this constant returns the class name as it was declared (case-sensitive). In PHP 4 its value is always lowercased.',
	},
	__DIR__: {
		description: 'The directory of the file. If used inside an include, the directory of the included file is returned. This is equivalent to dirname(__FILE__). This directory name does not have a trailing slash unless it is the root directory. (Added in PHP 5.3.0.)',
	},
	__FILE__: {
		description: 'The full path and filename of the file. If used inside an include, the name of the included file is returned. Since PHP 4.0.2, __FILE__ always contains an absolute path with symlinks resolved whereas in older versions it contained relative path under some circumstances.',
	},
	__FUNCTION__: {
		description: 'The function name. (Added in PHP 4.3.0) As of PHP 5 this constant returns the function name as it was declared (case-sensitive). In PHP 4 its value is always lowercased.',
	},
	__LINE__: {
		description: 'The current line number of the file.',
	},
	__METHOD__: {
		description: 'The class method name. (Added in PHP 5.0.0) The method name is returned as it was declared (case-sensitive).',
	},
	__NAMESPACE__: {
		description: 'The name of the current namespace (case-sensitive). This constant is defined in compile-time (Added in PHP 5.3.0).',
	},
	TRUE: {
	},
	FALSE: {
	},
	NULL: {
	},
	M_PI: {
		description: 'The constant Pi: 3.14159265358979323846',
	},
	M_E: {
		description: 'The constant e: 2.7182818284590452354',
	},
	M_LOG2E: {
		description: 'The constant log_2 e: 1.4426950408889634074',
	},
	M_LOG10E: {
		description: 'The constant log_10 e: 0.43429448190325182765',
	},
	M_LN2: {
		description: 'The constant log_e 2: 0.69314718055994530942',
	},
	M_LN10: {
		description: 'The constant log_e 10: 2.30258509299404568402',
	},
	M_PI_2: {
		description: 'The constant pi/2: 1.57079632679489661923',
	},
	M_PI_4: {
		description: 'The constant pi/4: 0.78539816339744830962',
	},
	M_1_PI: {
		description: 'The constant 1/pi: 0.31830988618379067154',
	},
	M_2_PI: {
		description: 'The constant 2/pi: 0.63661977236758134308',
	},
	M_SQRTPI: {
		description: 'The constant sqrt(pi): 1.77245385090551602729',
	},
	M_2_SQRTPI: {
		description: 'The constant 2/sqrt(pi): 1.12837916709551257390',
	},
	M_SQRT2: {
		description: 'The constant sqrt(2): 1.41421356237309504880',
	},
	M_SQRT3: {
		description: 'The constant sqrt(3): 1.73205080756887729352',
	},
	M_SQRT1_2: {
		description: 'The constant 1/sqrt(2): 0.7071067811865475244',
	},
	M_LNPI: {
		description: 'The constant log_e(pi): 1.14472988584940017414',
	},
	M_EULER: {
		description: 'Euler constant: 0.57721566490153286061',
	},
	PHP_ROUND_HALF_UP: {
		description: 'Round halves up = 1',
	},
	PHP_ROUND_HALF_DOWN: {
		description: 'Round halves down = 2',
	},
	PHP_ROUND_HALF_EVEN: {
		description: 'Round halves to even numbers = 3',
	},
	PHP_ROUND_HALF_ODD: {
		description: 'Round halvesto odd numbers = 4',
	},
	NAN: {
		description: 'NAN (as a float): Not A Number',
	},
	INF: {
		description: 'INF (as a float): The infinite',
	},
	PASSWORD_BCRYPT: {
		description: 'PASSWORD_BCRYPT is used to create new password hashes using the CRYPT_BLOWFISH algorithm.',
	},
	PASSWORD_DEFAULT: {
		description: 'The default algorithm to use for hashing if no algorithm is provided. This may change in newer PHP releases when newer, stronger hashing algorithms are supported.',
	},
};
export const keywords: IEntries = {
	define: {
		description: 'Defines a named constant at runtime.',
		signature: '( string $name , mixed $value [, bool $case_insensitive = false ] ): bool'
	},
	die: {
		description: 'This language construct is equivalent to exit().',
	},
	echo: {
		description: 'Outputs all parameters. \r\n\r\necho is not actually a function (it is a language construct), so you are not required to use parentheses with it. echo (unlike some other language constructs) does not behave like a function, so it cannot always be used in the context of a function. Additionally, if you want to pass more than one parameter to echo, the parameters must not be enclosed within parentheses.\r\n\r\necho also has a shortcut syntax, where you can immediately follow the opening tag with an equals sign. This short syntax only works with the short_open_tag configuration setting enabled.',
		signature: '( string $arg1 [, string $... ] ): void'
	},
	empty: {
		description: 'Determine whether a variable is considered to be empty.',
		signature: '( mixed $var ): bool'
	},
	exit: {
		description: 'Terminates execution of the script. Shutdown functions and object destructors will always be executed even if exit() is called.',
		signature: '([ string $status ] )\r\nvoid exit ( int $status ): void'
	},
	eval: {
		description: 'Evaluates the string given in code_str as PHP code. Among other things, this can be useful for storing code in a database text field for later execution.\r\nThere are some factors to keep in mind when using eval(). Remember that the string passed must be valid PHP code, including things like terminating statements with a semicolon so the parser doesn\'t die on the line after the eval(), and properly escaping things in code_str. To mix HTML output and PHP code you can use a closing PHP tag to leave PHP mode.\r\nAlso remember that variables given values under eval() will retain these values in the main script afterwards.',
		signature: '( string $code_str ): mixed'
	},
	include: {
		description: 'The include statement includes and evaluates the specified file.',
	},
	include_once: {
		description: 'The include_once statement includes and evaluates the specified file during the execution of the script. This is a behavior similar to the include statement, with the only difference being that if the code from a file has already been included, it will not be included again. As the name suggests, it will be included just once. \r\n\r\ninclude_once may be used in cases where the same file might be included and evaluated more than once during a particular execution of a script, so in this case it may help avoid problems such as function redefinitions, variable value reassignments, etc.',
	},
	isset: {
		description: 'Determine if a variable is set and is not NULL. \r\n\r\nIf a variable has been unset with unset(), it will no longer be set. isset() will return FALSE if testing a variable that has been set to NULL. Also note that a NULL byte is not equivalent to the PHP NULL constant. \r\n\r\nIf multiple parameters are supplied then isset() will return TRUE only if all of the parameters are set. Evaluation goes from left to right and stops as soon as an unset variable is encountered.',
		signature: '( mixed $var [, mixed $... ] ): bool'
	},
	list: {
		description: 'Like array(), this is not really a function, but a language construct. list() is used to assign a list of variables in one operation.',
		signature: '( mixed $varname [, mixed $... ] ): array'
	},
	require: {
		description: 'require is identical to include except upon failure it will also produce a fatal E_COMPILE_ERROR level error. In other words, it will halt the script whereas include only emits a warning (E_WARNING) which allows the script to continue.',
	},
	require_once: {
		description: 'The require_once statement is identical to require except PHP will check if the file has already been included, and if so, not include (require) it again.',
	},
	return: {
		description: 'If called from within a function, the return statement immediately ends execution of the current function, and returns its argument as the value of the function call. return will also end the execution of an eval() statement or script file. \r\n\r\nIf called from the global scope, then execution of the current script file is ended. If the current script file was included or required, then control is passed back to the calling file. Furthermore, if the current script file was included, then the value given to return will be returned as the value of the include call. If return is called from within the main script file, then script execution ends. If the current script file was named by the auto_prepend_file or auto_append_file configuration options in php.ini, then that script file\'s execution is ended.',
	},
	print: {
		description: 'Outputs arg. \r\n\r\nprint() is not actually a real function (it is a language construct) so you are not required to use parentheses with its argument list.',
		signature: '( string $arg ): int'
	},
	unset: {
		description: 'unset() destroys the specified variables. \r\n\r\nThe behavior of unset() inside of a function can vary depending on what type of variable you are attempting to destroy. \r\n\r\nIf a globalized variable is unset() inside of a function, only the local variable is destroyed. The variable in the calling environment will retain the same value as before unset() was called.',
		signature: '( mixed $var [, mixed $... ] ): void'
	},
	yield: {
		description: 'The heart of a generator function is the yield keyword. In its simplest form, a yield statement looks much like a return statement, except that instead of stopping execution of the function and returning, yield instead provides a value to the code looping over the generator and pauses execution of the generator function.',
	},
	abstract: {
	},
	and: {
	},
	array: {
	},
	as: {
	},
	break: {
	},
	case: {
	},
	catch: {
	},
	class: {
	},
	clone: {
	},
	const: {
	},
	continue: {
	},
	declare: {
	},
	default: {
	},
	do: {
	},
	else: {
	},
	elseif: {
	},
	enddeclare: {
	},
	endfor: {
	},
	endforeach: {
	},
	endif: {
	},
	endswitch: {
	},
	endwhile: {
	},
	extends: {
	},
	final: {
	},
	finally: {
	},
	for: {
	},
	foreach: {
	},
	function: {
	},
	global: {
	},
	goto: {
	},
	if: {
	},
	implements: {
	},
	interface: {
	},
	instanceof: {
	},
	insteadOf: {
	},
	namespace: {
	},
	new: {
	},
	or: {
	},
	parent: {
	},
	private: {
	},
	protected: {
	},
	public: {
	},
	self: {
	},
	static: {
	},
	switch: {
	},
	throw: {
	},
	trait: {
	},
	try: {
	},
	use: {
	},
	var: {
	},
	while: {
	},
	xor: {
	},
};
