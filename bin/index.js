#!/usr/bin/env node
/* Usado para dizer ao Node.js que se trata de uma ferramenta do CLI */

const chalk = require('chalk')
const boxen = require('boxen')
const axios = require('axios')

/* "Styles" do boxen */
const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  align: 'center'
}

/* Função geradora de números aleatórios */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/* Emojis ツ */
const emoji = [
  '(*°○°*)♡',
  '↖(^o^)↗',
  '(。♡‿♡。)',
  'ʕ•̫͡•ʔ♡ʕ•̫͡•ʔ',
  'ʕ•̫͡•ʔ❤ʕ•̫͡•ʔ',
  'ο(^_^)ο♡彡',
  '(。♡‿♡。)',
  '(*˘︶˘*).。.:*♡',
  '(♡ര‿ര)',
];

/* Emojis pra quando der merda ¯\_(ツ)_/¯ */
const emojiFail = [
  '¯\_(ツ)_/¯',
  '⊙﹏⊙',
  '(￣＿￣)',
  '╭∩╮（￣▽￣）╭∩╮',
  '┌П┐⚀▄⚀┌П┐',
  '( T_T)',
  '【・_・?】',
  '┗(-_-;)┛',
  '(╬￣皿￣)凸',
];
/* Objeto com as decorações do boxen */
const decorations = {
  border: chalk.hex('#f20089')('♡ﾟ･｡｡･ﾟ♡ﾟ･｡♥｡･ﾟ♥ ♡ﾟ･｡｡･ﾟ♡ﾟ･｡♥｡･ﾟ♥ ♡ﾟ･｡｡･ﾟ♡ﾟ･｡♥｡･ﾟ♥ ♡ﾟ･｡｡･ﾟ♡ﾟ･｡♥｡･ﾟ♥'),
  borderFail: chalk.green('╭∩╮（￣▽￣）╭∩╮ ┌П┐⚀▄⚀┌П┐ ╭∩╮︶︿︶╭∩╮ 凸-.-凸 凸(｀0´)凸 (╬▔〔▔)凸'),
  emoji: emoji[getRandomInt(0, 8)],
  emojiFail: emojiFail[getRandomInt(0, 8)]
}

/* Utilidades... (Quebra linha e espaçador) */
const newline = '\n';
const space = ' | ';
/* URL da API Rest com todas as cantadas */
const url = 'https://5edc022111cb1d001665cc23.mockapi.io/cantada/homem/';

/* 
  Função construtora da mensagem

  A função recebe a cantada da api(response) e após isso retorna a
  mensagem formatada, com emojis e tudo mais... ~(˘▽˘~)(~˘▽˘)~
*/
function buildMessage(response) {
  return (
    decorations.border + 
    newline + newline + 
    /* ------------------------------------------------------------- */
    decorations.emoji + space + response + space + decorations.emoji +
    /* ------------------------------------------------------------- */
    newline + newline +
    decorations.border
  );
}

/* 
  Função construtora da mensagem de erro

  Quando a api não retorna uma cantada, esta função retorna uma
  mensagem formatada, com emojis e tudo mais... 凸(｀0´)凸
*/
function buildFailMessage(message) {
  return (
    decorations.borderFail + 
    newline + newline + 
    /* ------------------------------------------------------------- */
    message +
    /* ------------------------------------------------------------- */
    newline + newline +
    decorations.borderFail
  );
}

async function getCantada() {
  try {
    const response = await axios.get(url + getRandomInt(1, 32));
    return console.log(chalk.white(boxen(buildMessage(response.data.desc), options)));
  } catch (error) {
    return console.log(chalk.white(boxen(buildFailMessage('Sua beleza é tão grande que bugou esse pacote npm.'), options)));
  }
}

getCantada();